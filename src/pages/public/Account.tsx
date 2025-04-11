
import { AppLayout } from "@/components/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Patient, patientHealth } from "@/models/patient/Patient";
import { BellRing, CreditCard, Edit2, Loader, LogOut, Settings, Shield, User, UserCog } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { fetchMyProfilePatient, updatePatientInfo, healthDetailsByPatientId } from "@/services/PatientService";
import authService from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { uploadProfileImage } from "@/services/UserService";

export default function Account() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient>(null);
  const [patientHealth, setPatientHealth] = useState<patientHealth[]>(null);
  const id = patient?.id;
  const isFetching = useRef(false);
  useEffect(() => {
    getMyProfile();

  }, []);

  const getMyProfile = async () => {
    try {
      const response = await fetchMyProfilePatient();
      if (response) {
        if(response.data.user.image){
          setPreviewImage(response.data.user.image)
        }
        setPatient(response.data);
      }

    } catch (error) {
      console.log("Error fetching profile", error);
    }

  }

  useEffect(() => {
    getHealthDetails(id);

  }, [id]);

  const getHealthDetails = async (id: number) => {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      const response = await healthDetailsByPatientId(id);
      if (response) {
        setPatientHealth(response.data);

      }

    } catch (error) {
      console.log("Error fetching profile", error);
    }

  }

  const hanleUserInputChange = (e: any) => {
    const { name, value } = e.target;

    setPatient((prev) => {
      if (name.startsWith("user.")) {
        const userKey = name.split(".")[1]; // Extract the nested key (e.g., "phone")
        return {
          ...prev,
          user: {
            ...prev.user,
            [userKey]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };


  const updateChange = async () => {
    try {

      const response = await updatePatientInfo(patient);
      if (response.data.status) {
        console.log("Profile updated successfully", response);
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully."
        });
        getMyProfile();
      } else {
        toast({
          title: "Profile Updated",
          description: "Something went wrong while updating your profile.",
        });
      }

    } catch (error) {
      console.log("Error updating profile", error);
    }
  }
  const handleLogout = () => {
    authService.logout();
    navigate("/");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };
  // ****************************************
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
const [isuploading,SetUploading]=useState(false)
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleUpload = async () => {
    SetUploading(true)
    if (selectedFile) {
      if(selectedFile==null){
        toast({
            title: "No file selected",
            description: "Please select a file to upload.",
            variant: "destructive",
        });
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { 
        toast({
            title: "File too large",
            description: "The selected file exceeds the maximum size of 5MB. Please choose a smaller file.",
            variant: "destructive",
        });
        return; 
    }

      let formData: FormData = new FormData();
      formData.append('file', selectedFile);
      const response = await uploadProfileImage(patient.user.id, formData);
      if (response.data.status) {
        SetUploading(false);
        toast({
          title: "Profile photo updated",
          description: "Your profile photo has been updated successfully.",
        });
        getMyProfile();
        setSelectedFile(null);
      }else{
        SetUploading(false);
        toast({
          title: "Profile photo upload failed",
          description: "Something went wrong while uploading your profile photo.",
          variant: "destructive",
      });
      }
    }
  };

  return (
    <AppLayout>
      <div className="container px-4 mx-auto py-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#333]">{t('account.title')}</h1>
            <Button variant="outline" className="gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              {t('account.signOut')}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
            {/* Profile Summary Card */}
            <Card className="h-fit md:sticky top-6">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div onClick={handleAvatarClick} className="cursor-pointer">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={previewImage} />
                      <AvatarFallback>{(patient?.firstname? patient?.firstname.split("")[0]:"")+""+ (patient?.lastname? patient?.lastname.split("")[0]:"") }</AvatarFallback>
                    </Avatar>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {selectedFile && (
                    <Button variant="outline" size="sm" disabled={isuploading} className="mt-1 mb-2 px-4" onClick={handleUpload}>
                       {isuploading ? <Loader className="animate-spin h-4 w-4 mr-2" /> : "Upload"}
                       
                    </Button>
                  )}


                  {
                    patient?.firstname ? (
                      <h2 className="text-xl font-semibold">{`${patient.firstname} ${patient.lastname}`}</h2>
                    ) : null
                  }{
                    patient?.user?.email && (
                      <p className="text-sm text-gray-500 mb-4">{patient.user.email}</p>
                    )
                  }

                  {/* <Button variant="outline" size="sm" className="gap-2 mb-6">
                    <Edit2 className="h-3 w-3" />
                    {t('account.edit')}
                  </Button> */}

                  <div className="w-full space-y-2">
                    <AccountNavItem icon={<User />} label={t('account.personalInfo')} active />
                    <AccountNavItem icon={<Shield />} label={t('account.security')} />
                    <AccountNavItem icon={<BellRing />} label={t('account.notifications')} />
                    <AccountNavItem icon={<CreditCard />} label={t('account.paymentMethods')} />
                    <AccountNavItem icon={<UserCog />} label={t('account.familyMembers')} />
                    <AccountNavItem icon={<Settings />} label={t('account.preferences')} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Area */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{t('account.personalInfo')}</CardTitle>
                      <CardDescription>{t('account.manageDetails')}</CardDescription>
                    </div>
                    <Button size="sm" onClick={updateChange}>{t('account.saveChanges')}</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t('account.firstName')}</Label>
                      <Input id="firstName" value={patient?.firstname} name="firstname" onChange={(e) => hanleUserInputChange(e)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t('account.lastName')}</Label>
                      <Input id="lastName" value={patient?.lastname} name="lastname" onChange={(e) => hanleUserInputChange(e)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('account.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={patient?.user?.email || ''} // Add a fallback value
                        name="user.email"
                        onChange={(e) => hanleUserInputChange(e)}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('account.phone')}</Label>
                      <Input id="phone" value={patient?.user?.phone || ''} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">{t('account.dob')}</Label>
                      <Input id="dob" type="date" value={patient?.dob ? new Date(patient.dob).toISOString().split('T')[0] : ''} name="dob" onChange={(e) => hanleUserInputChange(e)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">{t('account.gender')}</Label>
                      <div className="flex items-center gap-4">

                        <Label htmlFor="male">Male</Label>
                        <Input id="male" type="radio" style={{ height: "20px" }} value="Male" checked={patient?.gender == "Male"} name="gender" onChange={(e) => hanleUserInputChange(e)} />
                        <Label htmlFor="female">Female</Label>
                        <Input id="female" style={{ height: "20px" }} type="radio" value="Female" checked={patient?.gender == "Female"} name="gender" onChange={(e) => hanleUserInputChange(e)} />

                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('account.addressInfo')}</CardTitle>
                  <CardDescription>{t('account.manageAddresses')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Home</h3>
                          <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">Default</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {patient?.city},<br />
                          {patient?.district?.name},<br />
                          {patient?.state?.name}, {patient?.country?.name}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">{t('account.edit')}</Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">{t('account.delete')}</Button>
                      </div>
                    </div>

                    {/* <div className="flex justify-between items-start p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Office</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          456 Business Park, Building C, Floor 5<br />
                          Powai, Mumbai, 400076<br />
                          Maharashtra, India
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">{t('account.edit')}</Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">{t('account.delete')}</Button>
                      </div>
                    </div>
                     */}
                    <Button variant="outline" className="w-full">
                      + {t('account.addAddress')}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('account.healthInfo')}</CardTitle>
                  <CardDescription>{t('account.healthInfoDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  {patientHealth && patientHealth.length > 0 ? (
                    patientHealth.map((health, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="space-y-2">
                              <Label htmlFor={`height-${index}`}>{t('account.height')}</Label>
                              <Input id={`height-${index}`} value={health.height || ''} readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`weight-${index}`}>{t('account.weight')}</Label>
                              <Input id={`weight-${index}`} value={health.weight || ''} readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`bloodGroup-${index}`}>{t('account.bloodGroup')}</Label>
                              <Input id={`bloodGroup-${index}`} value={health.bloodGroup || ''} readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`allergies-${index}`}>{t('account.allergies')}</Label>
                              <Input id={`allergies-${index}`} value={health.allergies || 'None'} readOnly />
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 space-y-4">
                          <h3 className="font-medium">{t('account.currentMedication')}</h3>
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-gray-500">{health.currentMedication || "No current medications added"}</p>
                          </div>
                          <Button variant="outline" size="sm">{t('account.addMedication')}</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No health details available</p>
                  )}


                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

interface AccountNavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function AccountNavItem({ icon, label, active = false }: AccountNavItemProps) {
  return (
    <div className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${active ? 'bg-orange-50 text-primary' : 'hover:bg-gray-100'}`}>
      <div className={`${active ? 'text-primary' : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className={`text-sm ${active ? 'font-medium' : ''}`}>{label}</span>
    </div>
  );
}

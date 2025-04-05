
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface ReviewStepProps {
  appointmentObj: any;
}

export function ReviewStep({ appointmentObj }: ReviewStepProps) {
  const { t } = useTranslation();
  
  // Format the date from the slot
  const formatDate = () => {
    if (!appointmentObj?.slot?.date) return "";
    try {
      if (appointmentObj.slot.date instanceof Date) {
        return format(appointmentObj.slot.date, "PPP");
      } else {
        return format(new Date(appointmentObj.slot.date), "PPP");
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      return String(appointmentObj.slot.date);
    }
  };

  // Format the time from the slot
  const formatTime = () => {
    if (!appointmentObj?.slot?.startTime) return "";
    try {
      if (appointmentObj.slot.startTime instanceof Date) {
        return format(appointmentObj.slot.startTime, "h:mm a");
      } else {
        return format(new Date(appointmentObj.slot.startTime), "h:mm a");
      }
    } catch (error) {
      console.error("Error formatting time:", error);
      return String(appointmentObj.slot.startTime);
    }
  };

  return (
    <div className="space-y-6 py-2">
      <h3 className="text-lg font-semibold">{t('Review Appointment Details')}</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-2">{t('Doctor Information')}</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">{t('Doctor Name')}:</div>
            <div>{appointmentObj?.doctor?.firstname} {appointmentObj?.doctor?.lastname}</div>
            
            <div className="text-gray-500">{t('Specialization')}:</div>
            <div>
              {appointmentObj?.doctor?.specializationList?.[0]?.name || t('Not specified')}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-2">{t('Clinic Information')}</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">{t('Clinic Name')}:</div>
            <div>{appointmentObj?.branch?.clinic?.name || t('Not specified')}</div>
            
            <div className="text-gray-500">{t('Address')}:</div>
            <div>{appointmentObj?.branch?.clinic?.address || t('Not specified')}</div>
            
            <div className="text-gray-500">{t('Contact')}:</div>
            <div>{appointmentObj?.branch?.clinic?.phone || t('Not specified')}</div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-2">{t('Appointment Details')}</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">{t('Date')}:</div>
            <div>{formatDate()}</div>
            
            <div className="text-gray-500">{t('Time')}:</div>
            <div>{formatTime()}</div>
            
            <div className="text-gray-500">{t('Duration')}:</div>
            <div>{appointmentObj?.slot?.duration || '30'} minutes</div>
            
            <div className="text-gray-500">{t('Consultation Fee')}:</div>
            <div>₹{appointmentObj?.doctorClinic?.consultationFee || '1,200'}</div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-2">{t('Patient Information')}</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">{t('Patient Name')}:</div>
            <div>
              {appointmentObj?.familyMember?.name || 
               (appointmentObj?.patient?.name || t('Self'))}
            </div>
            
            <div className="text-gray-500">{t('Relationship')}:</div>
            <div>
              {appointmentObj?.familyMember?.relationship || 
               (appointmentObj?.familyMember ? t('Family Member') : t('Self'))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

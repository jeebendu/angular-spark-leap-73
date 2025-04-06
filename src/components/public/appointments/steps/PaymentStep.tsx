
import { CreditCard, Wallet, Building } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { calculateAppointmentCost } from "@/services/appointmentService";

interface PaymentStepProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export function PaymentStep({ paymentMethod, setPaymentMethod }: PaymentStepProps) {
  const costs = calculateAppointmentCost();
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <CreditCard className="mr-2 h-5 w-5" />
        Payment Information
      </h3>
      
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <h4 className="font-medium">Appointment Summary</h4>
        
        <div className="space-y-2">
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Consultation Fee</span>
            <span className="font-medium">₹{costs.consultationFee}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Platform Fee</span>
            <span className="font-medium">₹{costs.platformFee}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">GST (18%)</span>
            <span className="font-medium">₹{costs.gst}</span>
          </div>
          
          <div className="border-t mt-2 pt-3 flex justify-between font-bold">
            <span>Total Amount</span>
            <span className="text-primary text-lg">₹{costs.total}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border p-6">
        <Label className="block mb-4 font-medium">Select Payment Method</Label>
        
        <RadioGroup 
          value={paymentMethod} 
          onValueChange={setPaymentMethod}
          className="space-y-4"
        >
          <div className={`flex items-center border rounded-lg p-4 ${paymentMethod === 'card' ? 'border-primary bg-slate-50' : ''}`}>
            <RadioGroupItem value="card" id="card" className="mr-3" />
            <Label htmlFor="card" className="cursor-pointer flex-1">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Credit/Debit Card</div>
                  <div className="text-xs text-gray-500">All major cards accepted</div>
                </div>
              </div>
            </Label>
          </div>
          
          <div className={`flex items-center border rounded-lg p-4 ${paymentMethod === 'upi' ? 'border-primary bg-slate-50' : ''}`}>
            <RadioGroupItem value="upi" id="upi" className="mr-3" />
            <Label htmlFor="upi" className="cursor-pointer flex-1">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center mr-3">
                  <Wallet className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">UPI</div>
                  <div className="text-xs text-gray-500">Google Pay, PhonePe, Paytm & more</div>
                </div>
              </div>
            </Label>
          </div>
          
          <div className={`flex items-center border rounded-lg p-4 ${paymentMethod === 'netbanking' ? 'border-primary bg-slate-50' : ''}`}>
            <RadioGroupItem value="netbanking" id="netbanking" className="mr-3" />
            <Label htmlFor="netbanking" className="cursor-pointer flex-1">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center mr-3">
                  <Building className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">Net Banking</div>
                  <div className="text-xs text-gray-500">All major banks supported</div>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
        <p className="text-sm text-green-700">
          Your payment information is encrypted and secure. No additional fees will be charged.
        </p>
      </div>
    </div>
  );
}

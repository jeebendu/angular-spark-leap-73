
import { CreditCard } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PaymentStepProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export function PaymentStep({ paymentMethod, setPaymentMethod }: PaymentStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <CreditCard className="mr-2 h-5 w-5" />
        Payment Information
      </h3>
      
      <div className="border rounded-lg p-4 mb-6 bg-gray-50">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Consultation Fee</span>
          <span className="font-medium">₹800</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Platform Fee</span>
          <span className="font-medium">₹100</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">GST (18%)</span>
          <span className="font-medium">₹162</span>
        </div>
        <div className="border-t mt-2 pt-2 flex justify-between font-bold">
          <span>Total Amount</span>
          <span>₹1,062</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <Label className="block mb-2">Select Payment Method</Label>
        
        <RadioGroup 
          value={paymentMethod} 
          onValueChange={setPaymentMethod}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-3 hover:border-primary transition-colors">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="cursor-pointer flex-1">Credit/Debit Card</Label>
          </div>
          
          <div className="flex items-center space-x-2 border rounded-lg p-3 hover:border-primary transition-colors">
            <RadioGroupItem value="upi" id="upi" />
            <Label htmlFor="upi" className="cursor-pointer flex-1">UPI</Label>
          </div>
          
          <div className="flex items-center space-x-2 border rounded-lg p-3 hover:border-primary transition-colors">
            <RadioGroupItem value="netbanking" id="netbanking" />
            <Label htmlFor="netbanking" className="cursor-pointer flex-1">Net Banking</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}


import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon, Send, SmilePlus, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  
  return (
    <AppLayout>
      <div className="container mx-auto h-full flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row h-full">
          {/* Sidebar with chat list */}
          <div className="md:w-80 border-r border-gray-200 bg-white md:h-full overflow-hidden">
            <div className="p-4">
              <h1 className="text-xl font-bold text-[#333] mb-4">Messages</h1>
              <div className="relative mb-4">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search conversations..."
                  className="pl-10 w-full h-9"
                />
              </div>
              
              <div className="space-y-2">
                <ChatContact
                  name="Dr. Sarah Johnson"
                  message="Your appointment is confirmed for tomorrow at 10:00 AM."
                  time="10:30 AM"
                  unread={2}
                  active={true}
                />
                
                <ChatContact
                  name="Dr. Michael Chen"
                  message="Please share your previous reports before the appointment."
                  time="Yesterday"
                  unread={0}
                  active={false}
                />
                
                <ChatContact
                  name="Orange Health Support"
                  message="Your test results are ready. You can view them in the reports section."
                  time="Tuesday"
                  unread={0}
                  active={false}
                />
                
                <ChatContact
                  name="Dr. Priya Sharma"
                  message="How are you feeling after starting the medication?"
                  time="Monday"
                  unread={0}
                  active={false}
                />
                
                <ChatContact
                  name="Appointment Team"
                  message="Your appointment with Dr. Williams has been rescheduled to Friday."
                  time="23/06/2023"
                  unread={0}
                  active={false}
                />
              </div>
            </div>
          </div>
          
          {/* Main chat area */}
          <div className="flex-1 flex flex-col h-[calc(100vh-180px)] md:h-[calc(100vh-80px)] bg-gray-50">
            {/* Chat header */}
            <div className="bg-white p-4 border-b border-gray-200 flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">Dr. Sarah Johnson</h2>
                <p className="text-xs text-gray-500">Cardiologist • Online</p>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <ReceivedMessage 
                message="Hello! I've reviewed your test results and would like to discuss them with you."
                time="10:15 AM"
              />
              
              <SentMessage 
                message="Hi Dr. Johnson, thank you for checking. When would be a good time to discuss?"
                time="10:20 AM"
              />
              
              <ReceivedMessage 
                message="We can discuss it now if you're available. Your heart rate and blood pressure readings look normal, but I noticed your cholesterol levels are slightly elevated."
                time="10:22 AM"
              />
              
              <ReceivedMessage 
                message="I'd recommend some dietary changes and possibly starting on a mild medication. Would you prefer a video consultation to go over this in more detail?"
                time="10:23 AM"
              />
              
              <SentMessage 
                message="Yes, I would definitely prefer a video consultation. Can we schedule it for tomorrow?"
                time="10:25 AM"
              />
              
              <ReceivedMessage 
                message="Sure, I have a slot available tomorrow at 10:00 AM. Would that work for you?"
                time="10:28 AM"
              />
              
              <SentMessage 
                message="10:00 AM works perfectly for me. Thank you!"
                time="10:30 AM"
              />
              
              <ReceivedMessage 
                message="Your appointment is confirmed for tomorrow at 10:00 AM. You'll receive a notification 15 minutes before the consultation with a link to join the video call."
                time="10:30 AM"
              />
            </div>
            
            {/* Message input */}
            <div className="bg-white p-3 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <SmilePlus className="h-5 w-5 text-gray-500" />
                </Button>
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

interface ChatContactProps {
  name: string;
  message: string;
  time: string;
  unread: number;
  active: boolean;
}

function ChatContact({ name, message, time, unread, active }: ChatContactProps) {
  return (
    <div className={`p-3 rounded-lg cursor-pointer flex items-start gap-3 hover:bg-gray-50 ${active ? 'bg-orange-50' : ''}`}>
      <Avatar>
        <AvatarImage src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`} />
        <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm truncate">{name}</h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-xs text-gray-600 truncate">{message}</p>
      </div>
      {unread > 0 && (
        <div className="bg-primary text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
          {unread}
        </div>
      )}
    </div>
  );
}

function SentMessage({ message, time }: { message: string; time: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[75%]">
        <div className="bg-primary text-white p-3 rounded-lg rounded-tr-none">
          {message}
        </div>
        <div className="text-xs text-gray-500 mt-1 text-right">{time}</div>
      </div>
    </div>
  );
}

function ReceivedMessage({ message, time }: { message: string; time: string }) {
  return (
    <div className="flex gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
        <AvatarFallback>SJ</AvatarFallback>
      </Avatar>
      <div className="max-w-[75%]">
        <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
          {message}
        </div>
        <div className="text-xs text-gray-500 mt-1">{time}</div>
      </div>
    </div>
  );
}

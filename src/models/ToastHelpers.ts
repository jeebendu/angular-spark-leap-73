interface ToasterToast {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactElement;
    variant?: "default" | "destructive";
    open?: boolean;
    dismiss?: () => void;
  }
  
  export interface ToastHelpers {
    toast: (props: any) => { id: string; dismiss: () => void; update: (props: ToasterToast) => void };
    dismiss: (toastId?: string) => void;
    toasts: ToasterToast[];
  }
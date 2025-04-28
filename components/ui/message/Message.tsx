import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const messageVariants = cva(
  "relative rounded-lg border p-4 flex gap-3 transition-all",
  {
    variants: {
      variant: {
        info: "bg-blue-50 border-blue-200 text-blue-800",
        success: "bg-green-50 border-green-200 text-green-800",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
        error: "bg-red-50 border-red-200 text-red-800",
        neutral: "bg-gray-50 border-gray-200 text-gray-800",
      },
      size: {
        sm: "text-xs py-2 px-3",
        default: "text-sm",
        lg: "text-base p-5",
      },
      withActions: {
        true: "pb-14",
        false: "",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "default",
      withActions: false,
    },
  }
);

export const messageIcons = {
  info: <Info className="h-5 w-5 text-blue-500" />,
  success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  neutral: <Info className="h-5 w-5 text-gray-500" />,
};

export interface Action {
  label: string;
  onClick: () => void;
  variant?: 'link' | 'default' | 'destructive';
}

export interface MessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageVariants> {
  title?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: Action[];
  dismissible?: boolean;
  onDismiss?: () => void;
  collapsible?: boolean;
  details?: React.ReactNode;
}

export function Message({
  className,
  variant = "neutral",
  size,
  title,
  description,
  icon,
  actions,
  dismissible = false,
  onDismiss,
  collapsible = false,
  details,
  children,
  ...props
}: MessageProps) {
  const [expanded, setExpanded] = React.useState(false);
  
  const hasActions = actions && actions.length > 0;
  
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={cn(
        messageVariants({ variant, size, withActions: hasActions }),
        className
      )}
      {...props}
    >
      {/* Icon */}
      {icon || messageIcons[variant as keyof typeof messageIcons]}
      
      <div className="flex-1 space-y-1">
        {/* Title and content */}
        <div className="space-y-1">
          {title && <p className="font-medium">{title}</p>}
          {description && <p className={cn(!title && "font-medium")}>{description}</p>}
          {children}
        </div>
        
        {/* Collapsible details */}
        {collapsible && (
          <>
            <Button
              variant="link"
              className={cn("p-0 h-auto font-normal", variant === "error" ? "text-red-800" : variant === "success" ? "text-green-800" : variant === "warning" ? "text-yellow-800" : variant === "info" ? "text-blue-800" : "text-gray-800")}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  <span>Show less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  <span>Show details</span>
                </>
              )}
            </Button>
            
            {expanded && (
              <div className="mt-2 pt-2 border-t border-dashed">
                {details}
              </div>
            )}
          </>
        )}
        
        {/* Actions */}
        {hasActions && (
          <div className="absolute bottom-0 left-0 w-full p-2 flex justify-end gap-2 border-t bg-white bg-opacity-90">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "link"}
                size="sm"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      
      {/* Dismiss button */}
      {dismissible && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 rounded-full absolute top-1 right-1"
          onClick={onDismiss}
          aria-label="Dismiss message"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

import React from 'react';
import { Message, messageIcons } from './Message';
import { cn } from '@/lib/utils';

interface ValidationIssue {
  field?: string;
  message: string;
  hint?: string;
}

interface ValidationMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  issues: ValidationIssue[];
  formId?: string;
}

export function ValidationMessage({ 
  issues, 
  formId,
  className,
  ...props
}: ValidationMessageProps) {
  // Group issues by field
  const fieldIssues = issues.reduce((acc, issue) => {
    const field = issue.field || '_general';
    if (!acc[field]) acc[field] = [];
    acc[field].push(issue);
    return acc;
  }, {} as Record<string, ValidationIssue[]>);
  
  // Count by field
  const fieldCount = Object.keys(fieldIssues).length;
  const totalCount = issues.length;
  
  // Focus a field on click
  const focusField = (field: string) => {
    if (field === '_general' || !formId) return;
    
    const element = document.getElementById(`${formId}-${field}`);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Message
      variant="error"
      title={`${totalCount} ${totalCount === 1 ? 'validation issue' : 'validation issues'} found`}
      description={`Problems were found in ${fieldCount} ${fieldCount === 1 ? 'field' : 'fields'}.`}
      className={cn("text-sm", className)}
      collapsible
      details={
        <div className="space-y-3">
          {Object.entries(fieldIssues).map(([field, issues]) => (
            <div key={field} className="space-y-1">
              {field !== '_general' && (
                <h4 
                  className="font-medium cursor-pointer flex items-center gap-1 text-red-700"
                  onClick={() => focusField(field)}
                >
                  Field: {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
              )}
              <ul className="list-disc list-inside space-y-1">
                {issues.map((issue, issueIndex) => (
                  <li key={issueIndex}>
                    {issue.message}
                    {issue.hint && (
                      <p className="ml-6 text-gray-600 italic text-xs">{issue.hint}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      }
      {...props}
    />
  );
}

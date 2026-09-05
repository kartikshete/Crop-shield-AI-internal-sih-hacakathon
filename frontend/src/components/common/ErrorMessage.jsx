import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

export const ErrorMessage = ({
  title = 'Something went wrong',
  message = 'Unable to complete operation. Please check connectivity.',
  onRetry = null,
  className = '',
}) => {
  return (
    <div className={`p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3.5 ${className}`}>
      <div className="p-2 rounded-xl bg-rose-100 text-rose-700 flex-shrink-0 mt-0.5">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-rose-900">{title}</h4>
        <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">{message}</p>
        {onRetry && (
          <div className="mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={onRetry}
              icon={RefreshCw}
              className="bg-white hover:bg-rose-50 border-rose-200 text-rose-800"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;

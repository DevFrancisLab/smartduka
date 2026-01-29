import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface ReminderModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (message: string) => Promise<void> | void;
  defaultMessage?: string;
  customerName?: string;
}

export default function ReminderModal({ open, onClose, onSend, defaultMessage = '', customerName }: ReminderModalProps) {
  const [message, setMessage] = useState(defaultMessage);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setMessage(defaultMessage);
  }, [defaultMessage, open]);

  const handleSend = async () => {
    setSending(true);
    try {
      await onSend(message);
      onClose();
    } catch (e) {
      // let caller handle error
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send reminder{customerName ? ` — ${customerName}` : ''}</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <p className="text-sm text-muted-foreground mb-2">Edit the message below before sending the SMS reminder.</p>
          <Textarea value={message} onChange={(e) => setMessage((e.target as HTMLTextAreaElement).value)} rows={6} />
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={sending}>Cancel</Button>
          <Button onClick={handleSend} className="ml-2" disabled={sending}>
            {sending ? 'Sending...' : 'Send Reminder'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

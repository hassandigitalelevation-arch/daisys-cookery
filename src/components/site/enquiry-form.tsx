"use client";

import { useState } from "react";
import { Check, ClipboardCopy, Send } from "lucide-react";
import { FacebookIcon } from "@/components/ui/brand-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { buildEnquiryMessage, whatsappUrl } from "@/lib/order";
import { site } from "@/data/site";

type ContactFormProps = {
  label: string;
  placeholder: string;
  copyNote: string;
};

export function EnquiryForm({ label, placeholder, copyNote }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const text = buildEnquiryMessage({
    viaStudio: false,
    selection: undefined,
    name,
    phone,
    preferredDate: "",
    notes: message,
  });
  const waUrl = whatsappUrl(text);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (waUrl) window.open(waUrl, "_blank", "noopener");
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="ef-name">Your name</Label>
          <Input
            id="ef-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="ef-phone">Phone number</Label>
          <Input
            id="ef-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01XXXXXXXXX"
            autoComplete="tel"
            className="mt-2"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="ef-message">{label}</Label>
        <Textarea
          id="ef-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="mt-2"
        />
      </div>

      {waUrl ? (
        <Button size="lg" className="w-full sm:w-auto" type="submit">
          <Send className="size-4" aria-hidden />
          Send via WhatsApp
        </Button>
      ) : (
        <div className="flex flex-wrap gap-3">
          <Button size="lg" type="button" onClick={copy}>
            {copied ? (
              <>
                <Check className="size-4" aria-hidden /> Copied
              </>
            ) : (
              <>
                <ClipboardCopy className="size-4" aria-hidden /> Copy message
              </>
            )}
          </Button>
          <Button asChild size="lg" variant="outline" type="button">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
              <FacebookIcon className="size-4" />
              Send on Facebook
            </a>
          </Button>
        </div>
      )}
      <p className="text-xs text-muted-foreground">{copyNote}</p>
    </form>
  );
}
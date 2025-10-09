"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { apiService, type TransactionCreateRequest } from "@/lib/api"

const schema = z.object({
  action: z.enum(["request", "send"], { required_error: "Choose an action" }),
  to_name: z.string().min(1, "Recipient name is required"),
  to_phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone seems too long")
    .regex(/^[+]?\d[\d\s-]{6,}$/i, "Phone must contain digits (and optional +)"),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .positive("Amount must be greater than 0"),
  currency: z.string().default("TZS"),
  note: z.string().optional(),
  match_id: z.string().optional(),
  catch_id: z.string().optional(),
})

export function PaymentActionModal({
  open,
  onOpenChange,
  preset,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  preset?: Partial<Pick<z.infer<typeof schema>, "match_id" | "catch_id" | "to_name" | "to_phone" | "amount" | "action">>
}) {
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState("")

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      action: preset?.action ?? "request",
      to_name: preset?.to_name ?? "",
      to_phone: preset?.to_phone ?? "",
      amount: (preset?.amount as number) ?? 0,
      currency: "TZS",
      note: "",
      match_id: preset?.match_id,
      catch_id: preset?.catch_id,
    },
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setSubmitting(true)
    setServerError("")
    try {
      const payload: TransactionCreateRequest = {
        match_id: values.match_id || undefined,
        catch_id: values.catch_id || undefined,
        to_name: values.to_name,
        to_phone: values.to_phone.replace(/\s|-/g, ""),
        amount: values.amount,
        currency: values.currency || "TZS",
        note: values.note || undefined,
      }
      const res =
        values.action === "request"
          ? await apiService.createPaymentRequest(payload)
          : await apiService.sendPayment(payload)

      // Basic UX: close and simple alert. Integrators can replace with a toast.
      onOpenChange(false)
      if (typeof window !== "undefined") {
        window.alert(`${values.action === "request" ? "Request created" : "Payment sent"}: #${res.transaction.id}`)
      }
      form.reset()
    } catch (e: any) {
      setServerError(e?.message || "Failed to create transaction")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request or Send Payment</DialogTitle>
          <DialogDescription>Enter recipient details and amount, then choose the action.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="action"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Action</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="request">Request Payment</SelectItem>
                          <SelectItem value="send">Send Payment</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        placeholder="e.g., 52000"
                        value={String(field.value ?? "")}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="to_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Asha M. (Buyer)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="to_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., +255712345678" {...field} />
                    </FormControl>
                    <FormDescription>Use country code if possible.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Purpose or details (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {serverError && (
              <div className="text-destructive text-sm" role="alert">
                {serverError}
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Confirm"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

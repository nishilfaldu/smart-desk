import { Separator } from "@/components/ui/separator"
import { AccountForm } from "./account/account-form"
import { ProfileForm } from "./profile-form"
import { AppearanceForm } from "./account/appearance-form"
import { NotificationsForm } from "./account/notifications-form"
import { DisplayForm } from "./account/display-form"
import { Button } from "@/components/ui/button"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm />
      <Separator />
      <ProfileForm />
      <Separator />
      <AppearanceForm />
      <Separator />
      <NotificationsForm />
      <Separator />
      <DisplayForm />
      <Button type="submit">Update account</Button>
    </div>
  )
}

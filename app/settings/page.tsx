import SettingsForm from "@/components/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Settings
      </h1>

      <SettingsForm />
    </div>
  );
}
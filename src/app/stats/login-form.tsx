import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ error }: { error?: string }) {
  const message =
    error === "password"
      ? "That password is not right."
      : error === "setup"
        ? "Stats are not set up on this server yet."
        : "";

  return (
    <form action="/api/stats/login" method="post" className="mt-8 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="h-12 rounded-xl px-3 text-base md:text-base"
        />
      </div>
      {message ? (
        <p className="text-sm text-[#ff3b30]" role="alert">
          {message}
        </p>
      ) : null}
      <Button type="submit" className="h-12 w-full rounded-full text-base font-semibold">
        View stats
      </Button>
    </form>
  );
}

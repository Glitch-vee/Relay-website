import { redirect } from "next/navigation";

/** The setup guide lives on the home page now. This keeps old links working. */
export default function GuidePage() {
  redirect("/#setup");
}

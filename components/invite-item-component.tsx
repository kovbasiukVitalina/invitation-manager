import { InviteProps } from "@/type";
import { Mail } from "lucide-react";
import Icon from "./icon-component";
import { useRouter } from "next/navigation";

const InviteItemComponent = ({
  id,
  title,
  description,
  eventDate,
  location,
  createdAt,
  updatedAt,
  recipients,
}: InviteProps) => {
  const router = useRouter();

  const sliceText = (text: string) => {
    if (text.length > 20) {
      return text.slice(0, 20) + "...";
    }
    return text;
  };
  return (
    <div
      onClick={() => router.push(`/invitations/${id}`)}
      className="flex flex-wrap p-4 gap-4 border rounded-xl border-primary mb-4 cursor-pointer hover:bg-primary/10 transition-all hover:scale-[1.02]"
    >
      <Icon name={Mail} className="text-primary" size="150" />
      <div className="flex-1 min-w-[fit-content]">
        <div>
          <h2>Theme: {sliceText(title)}</h2>
          <p>Description: {sliceText(description)}</p>
          <p>Date: {eventDate}</p>
          <p>Location: {sliceText(location)}</p>
        </div>
        <div className="">
          <p>Date: {createdAt}</p>
          <p>Update date: {updatedAt}</p>
        </div>
      </div>
      <div>
        <p>Name: {recipients[0].name}</p>
        <p>Email: {recipients[0].email}</p>
        <p>Mobile: {recipients[0].mobile}</p>
        <p>
          Personalized message:
          {sliceText(recipients[0].personalizedMessage)}
        </p>
      </div>
    </div>
  );
};

export default InviteItemComponent;

"use client";

import LoadingComponent from "@/app/loading";
import Icon from "@/components/icon-component";
import { InviteProps } from "@/type";
import { BadgeMinus, Delete, Mail, Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const InvitationPage = () => {
  const { id } = useParams();

  const [invite, setInvite] = useState({} as InviteProps);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentKey, setCurrentKey] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<string>("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getInvite = async () => {
      const response = await fetch(`/api/invites/${id}`, { cache: "no-store" });
      const data = await response.json();
      setInvite(data);
      setLoading(false);
    };
    getInvite();
  }, [id]);

  const fixValueName = (value: string) => {
    const words = value.split(/(?=[A-Z])/);
    return words.join(" ");
  };

  const handleUpdate = async () => {
    try {
      const updatedInvite = {
        ...invite,
        [currentKey]: currentValue,
      };

      const response = await fetch(`/api/invites/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInvite),
      });

      if (response.ok) {
        const data = await response.json();
        setInvite(data);
        setOpen(false);
        toast({
          title: "Success",
          description: "Invite updated successfully",
          variant: "success",
        });
      } else {
        console.error("Failed to update invite");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDialogOpen = (key: string, value: string) => {
    setCurrentKey(key);
    setCurrentValue(value);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/invites/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast({
          title: "Delete",
          description: "Invite deleted successfully",
          variant: "destructive",
        });

        router.push("/invitations");
      } else {
        console.error("Failed to delete invite");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="container py-[100px]">
          <div>
            <Icon name={Mail} className="text-primary" size="300" />
            <Button onClick={handleDelete} variant="destructive">
              <Icon name={BadgeMinus} size="30" />
            </Button>
          </div>
          <Suspense fallback={<LoadingComponent />}>
            <ul className="">
              {Object.entries(invite).map(([key, value]) => (
                <li key={key}>
                  {key === "createdAt" ||
                  key === "updatedAt" ||
                  key === "id" ? (
                    <div className="w-full grid-1 md:grid grid-cols-2 p-3 border border-primary mb-4 rounded-3xl ">
                      <p className="capitalize-first font-bold text-start">
                        {fixValueName(key)}:
                      </p>
                      <p className="text-start">{value}</p>
                    </div>
                  ) : (
                    <Dialog  open={open} onOpenChange={setOpen}>
                      <DialogTrigger
                        className="cursor-pointer w-full grid-1 md:grid grid-cols-2 p-3 border border-primary mb-4 rounded-3xl"
                        onClick={() => handleDialogOpen(key, value as string)}
                      >
                        <p className="capitalize-first font-bold text-start">
                          {fixValueName(key)}:
                        </p>
                        <p className="text-start flex justify-between">
                          <span>{value}</span>
                          <Settings />
                        </p>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-primary">
                            You can change this value
                          </DialogTitle>
                          <DialogDescription>
                            <Input
                              className="mb-4"
                              type="text"
                              value={currentValue}
                              onChange={(e) => setCurrentValue(e.target.value)}
                            />
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex !justify-between">
                          <Button onClick={handleUpdate}>Update</Button>
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </li>
              ))}
            </ul>
          </Suspense>
        </div>
      )}
    </>
  );
};

export default InvitationPage;

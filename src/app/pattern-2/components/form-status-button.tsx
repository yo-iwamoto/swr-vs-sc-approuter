"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/client-ui";

type Props = ComponentPropsWithoutRef<typeof Button>;

export function FormStatusButton(props: Props) {
  const status = useFormStatus();

  return <Button loading={status.pending} {...props} />;
}

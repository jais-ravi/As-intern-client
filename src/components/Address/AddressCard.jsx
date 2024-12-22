import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const AddressCard = ({ address, onRemove, onSetDefault, isDefault }) => {
  return (
    <div>
      <Card className="shadow-md min-w-96">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-xl capitalize">{address.name}</CardTitle>{" "}
              {/* Address name */}
              <CardDescription>
                Phone no.: {address.mobileNumber}
              </CardDescription>
            </div>
            <div>
              {isDefault && (
                <Badge>Default</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="max-w-96">
          <p>{address.addressLine1}</p>{" "}
          <p>{address.addressLine2}</p>
          <p>
            {address.city}, {address.postalCode}
          </p>
          <p>{address.state}</p> {/* Landmark */}
        </CardContent>
        <CardFooter className="flex gap-3">
          {!isDefault && (
            <Button variant="outline" disabled={!address._id} onClick={() => onSetDefault(address._id)}>
              Set as default
            </Button>
          )}
          <Button variant="destructive" disabled={!address._id} onClick={() => onRemove(address._id)}>
            Remove
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddressCard;

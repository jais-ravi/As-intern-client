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

const AddressCard = ({ address, onRemove }) => {
  return (
    <div>
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-xl">{address.name}</CardTitle>{" "}
              {/* Address name */}
              <CardDescription>
                Phone no.: {address.mobileNumber}
              </CardDescription>
            </div>
            <div>
              <Badge>Default</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className=" max-w-80">
          <p>{address.addressLine1}</p>{" "}
          {/* falt house no building companny apartment*/}
          <p>{address.addressLine2}</p>
          <p>
            {address.city} ,{address.postalCode}
          </p>
          <p>{address.state}</p> {/* Lankmark*/}
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button variant="outline">Edit</Button>
          <Button variant="outline">Set as default</Button>
          <Button variant="destructive" onClick={() => onRemove(address._id)}>
            Remove
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddressCard;

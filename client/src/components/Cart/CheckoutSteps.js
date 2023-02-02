import { StepLabel, Typography, Stepper, Step } from "@material-ui/core";
import React, { Fragment } from "react";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icons: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icons: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icons: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}>
            <StepLabel
              style={{
                color:
                  activeStep >= index ? "lightseagreen" : "rgba(0,0,0,0.649)",
              }}
              icon={item.icons}>
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;

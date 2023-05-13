"use client";
import React, { useState, useMemo } from "react";
import Modal from "./Modal";
import Heading from "./../Heading";
import useRentModal from "@/app/hooks/useRent";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, FormState, useForm } from "react-hook-form";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true  
    })
  }
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const onNext = () => {
    setStep((value) => value + 1);
  };
  const rentModal = useRentModal();

  const {
    register, 
    reset, 
    handleSubmit, 
    setValue,
    watch, 
    formState: { errors } 
  } = useForm<FieldValues>({
    defaultValues:{
      category:'',
      locationValue: null,
      guestCount:1,
      bathroomCount:1,
      imageSrc:'',
      price:1,
      title:'',
      description:''
    }
  });

  const category = watch('category');
  
  
  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your property"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto ">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
          <CategoryInput
            onClick={(category) => 
              setCustomValue('category', category)}
            selected={category === item.label}
            label={item.label}
            icon={item.icon}
          />
        </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Your Airbnb home"
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default RentModal;
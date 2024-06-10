"use client";
import {Box, Button, InputBase} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";
import {useTranslation} from "react-i18next";
import {post_coupon} from "../../../../api/requests/coupon.requests";
import {toggle_loading} from "../global-progress-bar.common";
import {notify} from "@/components/common/global-snack-bar.common";
import {isString} from "lodash-es";
import {useCartList} from "@/store/cart-list";

export default function CouponInput({locale}) {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputIsLoading, setInputIsLoading] = useState(true);
  const [cancelCouponIsLoading, setCancelCouponIsLoading] = useState(true);
  const { set_coupon, cancel_coupon, total_after_coupon } = useCartList();

  useEffect(()=>{
    setInputIsLoading(false);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const coupon_code = inputRef.current.value;
    const payload = {
      code: coupon_code,
    };
    setIsLoading(true);
    setInputIsLoading(true);

    await toggle_loading(true);
    const result = await post_coupon(payload, locale);

    if (isString(result)) {
      notify(true, result);
      setIsLoading(false);
      setInputIsLoading(false);
    } else {
      notify(false, t("messages.operation-completed"));
      set_coupon(result);
      setCancelCouponIsLoading(false);
    }
    await toggle_loading(false);
  };

  const handleCancelCoupon = () => {
    cancel_coupon();
    inputRef.current.value = "";
    setIsLoading(false);
    setInputIsLoading(false);
    setCancelCouponIsLoading(true);
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      className="bg-secondary"
      sx={{ display: "flex", alignItems: "center", width: 320, height: "44px" }}
    >
      <InputBase
        inputRef={inputRef}
        onChange={() => {
          setIsLoading(inputRef.current.value === "");
        }}
        disabled={inputIsLoading}
        className="px-4"
        sx={{ ms: 1, flex: 1 }}
        placeholder={t("fields.coupon")}
        inputProps={{ "aria-label": "coupon" }}
      />
      <Button
        variant="contained"
        disabled={isLoading}
        color="primary"
        type="submit"
        sx={{ p: "10px", minWidth: 0 }}
        aria-label="Coupon"
      >
        <ArrowUpwardIcon />
      </Button>
      {
        total_after_coupon !== 0 && (<Button
            variant="text"
            onClick={handleCancelCoupon}
            disabled={cancelCouponIsLoading}
            type="button"
            sx={{ p: "10px", minWidth: 0, backgroundColor:"white" }}
            aria-label="Coupon"
          >
            <CloseIcon />
          </Button>
        )
      }
    </Box>
  );
}

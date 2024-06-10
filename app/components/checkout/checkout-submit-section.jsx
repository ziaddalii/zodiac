"use client";

import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {isString} from "lodash-es";
import {toggle_loading} from "../common/global-progress-bar.common";
import {post_add_order} from "../../../api/requests/orders.requests";
import {notify} from "../common/global-snack-bar.common";
import {scroll_to_top} from "../../../util/common";
import {useCartList} from "@/store/cart-list";

export const update_payment_method = (method) => {
  //TODO REMOVE
  method = "0";

  window.dispatchEvent(
    new CustomEvent("update_payment_method", {
      detail: { method },
    })
  );
};

export const update_address_id = (address_id) => {
  window.dispatchEvent(
    new CustomEvent("update_address_id", {
      detail: { address_id },
    })
  );
};

export const update_other_address = (other_address) => {
  window.dispatchEvent(
    new CustomEvent("update_other_address", {
      detail: { other: other_address },
    })
  );
};

export function CheckoutSubmitSection({ locale }) {
  const [is_loading, set_is_loading] = useState(false);
  const [payment_method, set_payment_method] = useState("0");
  const [address_id, set_address_id] = useState();
  const [error, set_error] = useState(".");
  const [other_address, set_other_address] = useState();
  const { t } = useTranslation();

  const on_update_payment_method = ({ detail: { method } }) => {
    set_payment_method(method);
  };

  const on_update_address_id = ({ detail: { address_id } }) => {
    set_address_id(address_id);
  };

  const on_update_other_address = ({ detail: { other } }) => {
    set_other_address(other);
  };

  const { coupon_code } = useCartList();
  useEffect(() => {
    window.addEventListener("update_payment_method", on_update_payment_method);
    window.addEventListener("update_address_id", on_update_address_id);
    window.addEventListener("update_other_address", on_update_other_address);

    return () => {
      window.removeEventListener(
        "update_payment_method",
        on_update_payment_method
      );
      window.removeEventListener("update_address_id", on_update_address_id);
      window.removeEventListener(
        "update_other_address",
        on_update_other_address
      );
    };
  }, []);

  const submit_order = async () => {
    if (
      !(payment_method && address_id !== undefined) ||
      !(payment_method && other_address !== undefined)
    ) {
      set_error(t("messages.please-submit-location"));
      return;
    }

    set_is_loading(true);

    await toggle_loading(true);

    scroll_to_top();

    const payload = other_address
      ? {
          payment: payment_method,
          other: other_address,
          ...(coupon_code !== "" && { coupon_code: coupon_code }),
        }
      : {
          payment: payment_method,
          address_id: Number(address_id),
          ...(coupon_code !== "" && { coupon_code: coupon_code }),
        };

    const result = await post_add_order(payload, locale);

    if (isString(result)) {
      notify(true, result);
    } else {
      notify(false, t("messages.operation-completed"));
      setTimeout(() => {
        window.location.replace("/auth/account/orders");
      }, 1000);
    }

    await toggle_loading(false);

    set_is_loading(false);
  };

  return (
    <>
      <Button
        disabled={is_loading}
        onClick={submit_order}
        variant="contained"
        color="accent"
        sx={{ display: "block", marginInline: "auto", marginTop: "1rem" }}
      >
        {t("fields.complete-order")}
      </Button>
      <p
        className={`text-center text-red-700 ${error === "." ? "invisible" : "visible"}`}
      >
        {error}
      </p>
    </>
  );
}

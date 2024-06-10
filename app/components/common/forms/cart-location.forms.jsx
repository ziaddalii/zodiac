/* eslint-disable react-hooks/exhaustive-deps */
// noinspection TypeScriptValidateTypes

"use client";
import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";
import {z} from "zod";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {FormSelect} from "../inputs/select.inputs";
import {getError, hasError, minLengthMsg} from "@/components/validations/util";
import {useZod} from "../../../../hooks/zod.hooks";
import {useCartList} from "@/store/cart-list";
import {update_address_id, update_other_address} from "@/components/checkout/checkout-submit-section";

const CartLocationForm = ({ locations, disabled }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const { errors, onSubmit, control, reset, getValues, watch } = useZod(
    {
      country: z.number().min(1, minLengthMsg(1, "fields.country", t)),
      province: z.number().min(1, minLengthMsg(1, "fields.province", t)),
      city: z.number().min(1, minLengthMsg(1, "fields.city", t)),
      address: z.string().min(3, minLengthMsg(3, "fields.address", t)),
      street: z.string().min(3, minLengthMsg(1, "fields.street", t)),
      floor: z.string().min(1, minLengthMsg(1, "fields.floor", t)),
      building: z.string().min(1, minLengthMsg(1, "fields.building", t)),
      landmark: z.string().min(3, minLengthMsg(3, "fields.landmark", t)),
    },
    {
      country: "",
      province: "",
      city: "",
      address: "",
      street: "",
      floor: "",
      building: "",
      landmark: "",
    },
    async (validated_data) => {
      update_address_id(null);
      update_other_address({
        name: [
          validated_data.floor,
          validated_data.building,
          validated_data.street,
        ].join(" "),
        street_name: validated_data.street,
        building_name_or_no: validated_data.building,
        floor_apartment_no: validated_data.floor,
        nearest_landmark: validated_data.landmark,
        city_id: validated_data.city,
        country_id: validated_data.country,
        province_id: validated_data.province,
      });
    }
  );

  const [countries_list, set_countries_list] = useState(locations.countries);

  const [provinces_list, set_provinces_list] = useState([]);

  const [cities_list, set_cities_list] = useState([]);

  useEffect(() => {
    const country = getValues("country");

    const filtered_provinces = locations.provinces.filter(
      (province) => province.country?.id === country
    );

    set_provinces_list(filtered_provinces);
  }, [watch("country")]);
  const { fees, set_fees } = useCartList();
  useEffect(() => {
    const province = getValues("province");

    const province_obj = locations.provinces.find(
      (e) => e.id === getValues("province")
    );

    if (province_obj && province_obj.fees) {
      set_fees(province_obj.fees);
    }

    const filtered_cities = locations.cities.filter(
      (city) => city.province?.id === province
    );

    set_cities_list(filtered_cities);
  }, [watch("province")]);

  useEffect(() => {
    if (
      !disabled &&
      getValues("city") &&
      getValues("address") &&
      getValues("street") &&
      getValues("floor") &&
      getValues("building") &&
      getValues("landmark")
    ) {
      onSubmit();
    }
  }, [
    disabled,
    watch("city"),
    watch("address"),
    watch("street"),
    watch("floor"),
    watch("building"),
    watch("landmark"),
  ]);

  return (
    <form className="!py-4 space-y-4">
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <FormSelect
            id="country"
            field={field}
            fullWidth
            error={hasError(errors, "country")}
            label={t("fields.country")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.country"),
            })}
            items={countries_list.map((e) => ({
              id: e.id,
              name: e.name,
              value: e.id,
            }))}
            disabled={disabled}
          />
        )}
      />

      <Controller
        name="province"
        control={control}
        render={({ field }) => (
          <FormSelect
            id={"province"}
            field={field}
            fullWidth
            error={hasError(errors, "province")}
            label={t("fields.province")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.province"),
            })}
            items={provinces_list.map((e) => ({
              id: e.id,
              name: e.name,
              value: e.id,
            }))}
            disabled={disabled}
          />
        )}
      />

      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <FormSelect
            id={"cities"}
            field={field}
            fullWidth
            error={hasError(errors, "city")}
            label={t("fields.city")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.city"),
            })}
            items={cities_list.map((e) => ({
              id: e.id,
              name: e.name,
              value: e.id,
            }))}
            disabled={disabled}
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="filled"
            margin="dense"
            fullWidth
            id="address"
            type="text"
            label={t("fields.address-name")}
            title={t("fields.address-name")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.address-name"),
            })}
            error={hasError(errors, "address")}
            helperText={getError(errors, "address")}
            disabled={isLoading}
          />
        )}
      />
      <Controller
        name="street"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="filled"
            margin="dense"
            fullWidth
            id="street"
            type="text"
            label={t("fields.street")}
            title={t("fields.street")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.street"),
            })}
            error={hasError(errors, "street")}
            helperText={getError(errors, "street")}
            disabled={isLoading}
          />
        )}
      />

      <Controller
        name="building"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="filled"
            margin="dense"
            fullWidth
            id="building"
            type="text"
            label={t("fields.building")}
            title={t("fields.building")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.building"),
            })}
            error={hasError(errors, "building")}
            helperText={getError(errors, "building")}
            disabled={isLoading}
          />
        )}
      />

      <Controller
        name="floor"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="filled"
            margin="dense"
            fullWidth
            id="floor"
            type="text"
            label={t("fields.floor")}
            title={t("fields.floor")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.floor"),
            })}
            error={hasError(errors, "floor")}
            helperText={getError(errors, "floor")}
            disabled={isLoading}
          />
        )}
      />

      <Controller
        name="landmark"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="filled"
            margin="dense"
            fullWidth
            id="landmark"
            type="text"
            label={t("fields.landmark")}
            title={t("fields.landmark")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.landmark"),
            })}
            error={hasError(errors, "landmark")}
            helperText={getError(errors, "landmark")}
            disabled={isLoading}
          />
        )}
      />
    </form>
  );
};

export default CartLocationForm;

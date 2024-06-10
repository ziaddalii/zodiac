// noinspection TypeScriptValidateTypes

"use client";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import {FormSelect} from "../inputs/select.inputs";
import {z} from "zod";
import {isString} from "lodash-es";
import {useTranslation} from "react-i18next";
import {useZod} from "./../../../../hooks/zod.hooks";
import {getError, hasError, minLengthMsg} from "./../../validations/util";
import {toggle_loading} from "../global-progress-bar.common";
import {notify} from "./../global-snack-bar.common";
import {post_addresses} from "../../../../api/requests/profile.requests";

function build_data(validatedData, original_address, id) {
  const addresses_body = {};

  const data = {
    addresses: [addresses_body],
  };

  if (original_address.id) {
    addresses_body.id = original_address.id;
  } else {
    addresses_body.id = null;
  }

  if (validatedData.address !== original_address.name) {
    addresses_body.name = validatedData.address;
  }
  if (validatedData.street !== original_address.street_name) {
    addresses_body.street_name = validatedData.street;
  }
  if (validatedData.building !== original_address.building_name_or_no) {
    addresses_body.building_name_or_no = validatedData.building;
  }
  if (validatedData.floor !== original_address.floor_apartment_no) {
    addresses_body.floor_apartment_no = validatedData.floor;
  }
  if (validatedData.landmark !== original_address.nearest_landmark) {
    addresses_body.nearest_landmark = validatedData.landmark;
  }
  if (validatedData.city !== original_address.city.id) {
    addresses_body.city_id = validatedData.city;
  }
  return data;
}

const AddressDialog = ({
  original_address,
  open,
  handleClose,
  provinces,
  countries,
  cities,
  locale,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { t } = useTranslation();

  const { errors, watch, getValues, setValue, onSubmit, control, reset } =
    useZod(
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
      async (validatedData) => {
        setIsLoading(true);

        await toggle_loading(true);
        // scroll_to_top();

        if (isEditing) {

          // Edit Address
          const result = await post_addresses(
            build_data(
              validatedData,
              original_address,
              original_address?.addressId
            ),
            locale
          );

          if (isString(result)) {
            notify(true, result);
          } else {
            notify(false, t("messages.operation-completed"));
            setTimeout(() => {
              window.location.replace("/auth/account/profile");
            }, 1000);
          }
        } else {
          const body = {
            addresses: [
              {
                id: null,
                name: validatedData.address,
                street_name: validatedData.street,
                building_name_or_no: validatedData.building,
                floor_apartment_no: validatedData.floor,
                nearest_landmark: validatedData.landmark,
                city_id: validatedData.city,
              },
            ],
          };

          const result = await post_addresses(body, locale);
          if (isString(result)) {
            notify(true, result);
          } else {
            notify(false, t("messages.operation-completed"));
            setTimeout(() => {
              window.location.replace("/auth/account/profile");
            }, 1000);
          }
        }

        await toggle_loading(false);

        setIsLoading(false);
      }
    );

  const [countries_list, set_countries_list] = useState(countries);

  const [provinces_list, set_provinces_list] = useState([]);

  const [cities_list, set_cities_list] = useState([]);

  const watch_country = watch("country");
  const watch_province = watch("province");

  useEffect(() => {
    const country = getValues("country");

    const filtered_provinces = provinces.filter(
        (province) => province.country?.id === country
    );

    set_provinces_list(filtered_provinces);
  }, [getValues, provinces, watch_country]);

  useEffect(() => {
    const province = getValues("province");

    const filtered_cities = cities.filter(
        (city) => city.province?.id === province
    );

    set_cities_list(filtered_cities);

    //RESET CITY IF DOESN'T EXIST IN LIST
    if (filtered_cities.findIndex((e) => e.id === getValues("city")) === -1) {
      setValue("city", "");
    }
  }, [cities, getValues, setValue, watch_province]);

  useEffect(() => {

    if (!open || !original_address) {
      setIsEditing(false);
      setValue("country", "");
      setValue("province", "");
      setValue("city", "");
      setValue("address", "");
      setValue("street", "");
      setValue("floor", "");
      setValue("building", "");
      setValue("landmark", "");
      return;
    }

    setValue("country", original_address ? original_address.country.id : "");
    setValue("province", original_address.province.id);
    setValue("city", original_address.city.id);
    setValue("address", original_address.name);
    setValue("street", original_address.street_name);
    setValue("floor", original_address.floor_apartment_no);
    setValue("building", original_address.building_name_or_no);
    setValue("landmark", original_address.nearest_landmark);
    setIsEditing(true);

  }, [open, original_address, setValue]);


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {original_address
          ? t("fields.edit-location")
          : t("fields.add-address")}
      </DialogTitle>
      <DialogContent className="min-w-[250px] w-full max-w-xl !py-4">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="col-span-1 bg-white rounded-lg">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <FormSelect
                  id="countries"
                  field={field}
                  fullWidth
                  label={t("fields.country")}
                  placeholder={t("fields.country")}
                  items={countries_list}
                  variant="outlined"
                  disabled={isLoading}
                />
              )}
            />
          </div>
          <div className="col-span-1 bg-white rounded-lg">
            <Controller
              name="province"
              control={control}
              render={({ field }) => (
                <FormSelect
                  id="provinces"
                  field={field}
                  fullWidth
                  label={t("fields.province")}
                  placeholder={t("fields.province")}
                  items={provinces_list}
                  variant="outlined"
                  disabled={isLoading}
                />
              )}
            />
          </div>
          <div className="col-span-1 bg-white rounded-lg">
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <FormSelect
                  id="cities"
                  field={field}
                  fullWidth
                  label={t("fields.city")}
                  placeholder={t("fields.city")}
                  items={cities_list}
                  variant="outlined"
                  disabled={isLoading}
                />
              )}
            />
          </div>
        </div>
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
              field: t("fields.address-name")})}
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
              field: t("fields.street")})}
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
              field: t("fields.building")})}
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
              field: t("fields.floor")})}
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
              field: t("fields.landmark")})}
              error={hasError(errors, "landmark")}
              helperText={getError(errors, "landmark")}
              disabled={isLoading}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} variant="outlined" onClick={handleClose}>
          {t("fields.cancel")}
        </Button>
        <Button
          disabled={isLoading}
          variant="contained"
          type="submit"
          onClick={onSubmit}
        >
          {t("fields.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressDialog;

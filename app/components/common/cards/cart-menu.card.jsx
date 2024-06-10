import {CardActionArea} from "@mui/material";
import {create_slug, format_price} from "../../../../util/common";
import Link from "next/link";
import QuantityCounterButtons from "../buttons/quantity.buttons";
import {useTranslation} from "react-i18next";
import {useCartList} from "@/store/cart-list";
import {useMemo} from "react";
import RemoveCartButtons from "@/components/common/buttons/remove-cart.buttons";

export default function CartMenuCard({
  product,
  locale,
  with_update = true,
  with_delete = true,
}) {
  const { t } = useTranslation();
  const { update_cart_list } = useCartList();

  const current_price = useMemo(
    () =>
      product.details.variant.prices.discount ||
      product.details.variant.prices.normal,
    [product]
  );

  const current_photo = useMemo(
      () => product.details.color.photos[0] ?? product.details.photos.card,
      [product],
  );

  return (
    <CardActionArea
      component="div"
      className="!grid grid-cols-4 gap-4 relative"
      sx={{
        p: 1,
        "& .MuiCardActionArea-focusHighlight": {
          zIndex: 0,
        },
      }}
    >
      <Link
        href={`/products/${product.id}/${create_slug(product.details.names.en)}`}
        className="absolute inset-0 z-10"
      ></Link>

      <div className="col-span-1 w-full aspect-square overflow-hidden">
        <img
          className="w-full object-cover"
          alt={product.details.photos.alt}
          src={current_photo}
        />
      </div>

      <div className="col-span-3 space-y-2 z-20 relative">
        <div className="flex items-center justify-between">
          <h2>{product.details.names[locale]}</h2>
          {
            with_delete && <RemoveCartButtons product={product} />
          }
          
        </div>

        {/* Quantity Counter */}
        {with_update && (
          <QuantityCounterButtons
            init={product.quantity}
            maxQuantity={product.details.color.stock}
            onUpdate={(new_quantity) =>
              update_cart_list(
                product.details,
                product.details.variant,
                product.details.color,
                new_quantity,
                product.quantity
              )
            }
          />
        )}

        {/* Quantity / Price */}
        <div className="text-sm flex justify-between">
          <div className="flex gap-1">
            <span className="text-SecondaryText">
              {product.quantity} x {""}
            </span>

            <span>
              {t("fields.egp")} {format_price(current_price)}
            </span>
          </div>
          <span>
            {t("fields.egp")} {format_price(product.details.total)}
          </span>
        </div>
      </div>
    </CardActionArea>
  );
}

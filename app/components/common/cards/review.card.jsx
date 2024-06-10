import { Rating } from "@mui/material";
import { useMemo } from "react";

export default function ReviewCard({ review }) {
  const full_name = useMemo(
    () => [review.customer.name.first, review.customer.name.last].join(" "),
    [review]
  );

  return (
    <div className="flex justify-between gap-4">
      <div className="flex gap-4 items-start">
        <img
          className="aspect-square rounded-[50%] w-14 h-14"
          alt={full_name}
          src={review.customer.photoUrl}
        />

        <div>
          <h2 className="text-lg">
            {full_name}
          </h2>
          <span className="text-SecondaryText">{review.body}</span>
        </div>
      </div>

      <div>
        <Rating
          size="small"
          readOnly
          name="review-rate"
          value={review.rating}
        />
      </div>
    </div>
  );
}

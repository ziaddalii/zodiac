import { Container } from "@mui/material";
import NewsletterForm from "../common/forms/newsletter.forms";
import Link from "next/link";
export default function NewsletterSection() {
  return (
    <Container maxWidth="xl">
      <section className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-12 " data-aos-delay={50} data-aos="fade-up">
        <div className="col-span-1 md:block hidden space-y-4 h-[500px] overflow-hidden">
          <img
            className="w-full object-cover"
            src={
              "https://woodmart.b-cdn.net/wp-content/uploads/2020/01/w-mf-category-1-min.jpg.webp"
            }
          />
        </div>
        <div className="col-span-1 flex gap-4 justify-center items-center p-8">
          <div className="text-center space-y-4">
            <h2 className="lg:text-5xl md:text-4xl w-[80%] mx-auto">
              Join Our Newslatter Now
            </h2>
            <p className="text-SecondaryText text-xl">
              A client that’s unhappy for a reason is a problem, a client that’s
              unhappy though can’t.
            </p>
            <NewsletterForm />
            <p>
              Will be used in accordance with our {""}
              <Link className="font-bold" href="/privacy">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}

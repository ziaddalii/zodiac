import {Container} from "@mui/material";
import CategoryCard from "../common/cards/category.card";

export default function CategoriesSection({categories, locale}) {
    return (
        <Container maxWidth="xl" >
            <section className="grid md:grid-cols-3 grid-cols-1 grid-rows-2 gap-4 md:h-[28rem] my-20">

                {
                    categories[0] && (
                        <div data-aos-delay={50} data-aos="fade-up" className="col-span-1 overflow-hidden group row-span-2">
                            <CategoryCard item={categories[0]} locale={locale}/>
                        </div>
                    )
                }

                <div className="col-span-1 row-span-2 flex flex-col gap-4 h-full">

                    {
                        categories[1] && (
                            <div data-aos-delay={100} data-aos="fade-up" className="overflow-hidden group w-full h-1/2">
                                <CategoryCard item={categories[1]} locale={locale}/>
                            </div>
                        )
                    }

                    {
                        categories[2] && (
                            <div data-aos-delay={150} data-aos="fade-up" className="overflow-hidden group w-full h-1/2">
                                <CategoryCard item={categories[2]} locale={locale}/>
                            </div>
                        )
                    }
                </div>

                {
                    categories[3] && (
                        <div data-aos-delay={200} data-aos="fade-up" className="col-span-1 overflow-hidden group row-span-2">
                            <CategoryCard item={categories[3]} locale={locale}/>
                        </div>
                    )
                }

            </section>
        </Container>
    );
}

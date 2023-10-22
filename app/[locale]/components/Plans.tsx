"use client";

import { useTranslations } from "next-intl";
import PlanCard from "./PlanCard";
import OurTab from "./OurTab";

function Plans() {

 

    return (
        <section>
            <h2 className="text-black-color-one text-3xl font-bold text-center mb-4">Choose the plan that works for you</h2>
            <OurTab />
        </section>
    )

}

export default Plans
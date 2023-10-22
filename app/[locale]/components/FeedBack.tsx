"use client"

import FeadBackCard from "./FeadBackCard"

function FeedBack() {
  return (
    <section className="py-12 px-8">
        <h2 className="text-center font-semibold text-3xl mb-9">Our Students Feedback</h2>
        <div className="flex flex-row justify-center items-start gap-5 flex-wrap">
            <FeadBackCard />
            <FeadBackCard />
            <FeadBackCard />
            <FeadBackCard />
            <FeadBackCard />
            <FeadBackCard />
            <FeadBackCard />
            <FeadBackCard />
        </div>
    </section>
  )
}

export default FeedBack
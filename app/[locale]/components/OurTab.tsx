
"use client"

import { CustomFlowbiteTheme, Tabs } from "flowbite-react"
import PlanCard from "./PlanCard"
import { useTranslations } from "next-intl";
import { BsPeople, BsPerson } from "react-icons/bs";

export default function OurTab() {

    const t = useTranslations("plans-section.plans");
    const t2 = useTranslations("plans-section");

    const customeTheme: CustomFlowbiteTheme = {
        tab: {
            tablist: {
                base: "flex justify-center items-center m-auto w-auto bg-secondary-color rounded-full px-12 py-2",
                tabitem: {
                  styles: {
                    pills: {
                      active: {
                        on: "rounded-full bg-white focus:ring-0 text-black px-8 py-2",
                        off: "rounded-full px-8 py-2 focus:ring-0 bg-secondary-color hover:bg-white hover:text-black text-white transition-colors",
                      }
                    }
                  }
                }
              },
        },
    }
    
    return (
    <>
      <Tabs.Group
      theme={customeTheme.tab}
      aria-label="Pills"
      style="pills"
    >
      <Tabs.Item
        active
        title="1 kid"
        icon={BsPerson }
      >
        <div className="py-8 px-8 flex justify-center items-center gap-10 flex-row-reverse flex-wrap">
        <PlanCard 
                title={t('0.title')}
                price={t('0.price')}
                f1={t('0.features.f-1')}
                f2={t('0.features.f-2')}
                f3={t('0.features.f-3')}
                f4={t('0.features.f-4')}
                f5={t('0.features.f-5')}
                btn={t2("plan-btn")}
            />
            <PlanCard 
                title={t('1.title')}
                price={t('1.price')}
                f1={t('1.features.f-1')}
                f2={t('1.features.f-2')}
                f3={t('1.features.f-3')}
                f4={t('1.features.f-4')}
                f5={t('1.features.f-5')}
                btn={t2("plan-btn")}
            />
            <PlanCard 
                title={t('2.title')}
                price={t('2.price')}
                f1={t('2.features.f-1')}
                f2={t('2.features.f-2')}
                f3={t('2.features.f-3')}
                f4={t('2.features.f-4')}
                f5={t('2.features.f-5')}
                btn={t2("plan-btn")}
            />
            <PlanCard 
                title={t('3.title')}
                price={t('3.price')}
                f1={t('3.features.f-1')}
                f2={t('3.features.f-2')}
                f3={t('3.features.f-3')}
                f4={t('3.features.f-4')}
                f5={t('3.features.f-5')}
                btn={t2("plan-btn")}
            />
        </div>
      </Tabs.Item>
    </Tabs.Group>
    </>
  )
}

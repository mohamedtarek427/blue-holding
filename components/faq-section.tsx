"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I join the game?",
    answer:
      "Simply click the 'Start Game' button on any unlocked level to begin your learning journey. New players will start with the 'Climbing Everest' challenge.",
  },
  {
    question: "When will the next level be available?",
    answer:
      "New levels are unlocked based on your progress and completion of previous challenges. The next level becomes available immediately after completing your current level.",
  },
  {
    question: "How is the leaderboard calculated?",
    answer:
      "The leaderboard ranks players based on three key factors: total points earned, completion speed, and number of attempts. Higher scores, faster completions, and fewer attempts will boost your ranking.",
  },
  {
    question: "Can I replay a level?",
    answer:
      "Yes! You can replay any completed level to improve your score, completion time, or just to refresh your knowledge. Each attempt counts towards your efficiency rating.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 bg-white text-darkGray">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 ">FAQs</h2>
        <p className="text-center text-xl text-gray-400 mb-12">
          Everything You Need to Know to Dominate the Challenge!
        </p>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg px-6 border-0 shadow-md"
              >
                <AccordionTrigger className="text-lg font-bold py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

import { Collapse, Button } from "antd";
import Link from "next/link";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/faq`, {
    cache: "no-cache",
  });

  const response = await res.json();
  if (response && response.success) {
    return response.data;
  } else {
    throw new Error("Failed to fetch data");
  }
}

async function FAQ() {
  const data = await getData();

  const items = data.map((item: any) => {
    return {
      key: item.id,
      label: item.question,
      children: <p>{item.answer}</p>,
    };
  });

  return (
    <div className="block faqBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Frequently Asked Questions</h2>
        </div>
        <Collapse defaultActiveKey={["1"]} items={items} />
        <div className="quickSupport">
          <h3>Want quick support?</h3>
          <p>
            Get quick support 24/7 with our dedicated customer service team.
            We&apos;re here to help you manage your account, answer any
            questions, and resolve any issues. Trust us to make your experience
            stress-free and enjoyable.
          </p>
          <Link href="/contact">
            <Button className="mt-4" type="primary">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FAQ;

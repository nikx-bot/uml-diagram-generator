const EXAMPLES = {
  class: [
    {
      label: "Library system",
      input: "Design a library management system with books, authors, members, and borrowing transactions. Include inheritance for different book types.",
    },
    {
      label: "E-commerce",
      input: "Model an e-commerce system with products, categories, customers, orders, and payment processing.",
    },
  ],
  sequence: [
    {
      label: "Login flow",
      input: "Show the sequence when a user logs in to a web app: browser sends credentials, auth service validates, JWT is returned, user is redirected.",
    },
    {
      label: "Payment processing",
      input: "Model the sequence for processing a credit card payment: customer, web app, payment gateway, bank, and order service.",
    },
  ],
  usecase: [
    {
      label: "ATM system",
      input: "Model use cases for an ATM: customer can withdraw cash, deposit money, check balance, and transfer funds. Bank admin can refill cash and view logs.",
    },
  ],
  activity: [
    {
      label: "Order processing",
      input: "Show the activity flow for processing an online order: validate cart, check inventory, charge payment, pack items, ship, send confirmation.",
    },
  ],
  er: [
    {
      label: "University DB",
      input: "Design a university database with students, professors, courses, departments, and enrollments with grades.",
    },
  ],
  component: [
    {
      label: "Microservices",
      input: "Show a microservices architecture for a ride-sharing app: API gateway, user service, driver service, booking service, notification service, and databases.",
    },
  ],
};

export default function ExamplePanel({ diagramType, onSelect }) {
  const examples = EXAMPLES[diagramType] || [];
  if (examples.length === 0) return null;

  return (
    <div className="example-panel">
      <span className="example-label">Try an example</span>
      <div className="example-chips">
        {examples.map((ex) => (
          <button
            key={ex.label}
            className="example-chip"
            onClick={() => onSelect({ input: ex.input, tab: "text" })}
          >
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
}

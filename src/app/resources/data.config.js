const chart = {
    variant: "gradient", // flat | gradient | outline
    mode: "divergent", // categorical | divergent | sequential
    height: 29, // default chart height
    axisLine: {
      stroke: "var(--neutral-alpha-weak)",
    },
    tick: {
      fill: "var(--neutral-on-background-weak)",
      fontSize: 11,
    },
    tickLine: false,
  };
  
  export { chart };
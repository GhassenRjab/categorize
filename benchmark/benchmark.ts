import Benchmark, { Event } from "benchmark";
import { categorize } from "../src/main";
import { categorize as legacyCategorize } from "./legacy";
import antelopes from "../fixtures/antelopes.json";

const suite = new Benchmark.Suite();

const categories = [
  {
    name: "Twisted",
    filter: ({ horns }: { horns: string }) => horns === "Twisted",
  },
  {
    name: "Straight",
    filter: ({ horns }: { horns: string }) => horns === "Straight",
  },
  {
    name: "Other",
    filter: ({ horns }: { horns: string }) =>
      horns !== "Twisted" && horns !== "Straight",
  },
];

// add tests
suite
  .add("categorize - single category", function () {
    categorize(antelopes, categories);
  })
  .add("categorize - multiple categories", function () {
    categorize(antelopes, categories, {
      singleCategoryMatch: false,
    });
  })
  .add("legacy categorize", function () {
    legacyCategorize(antelopes, categories);
  })
  // add listeners
  .on("cycle", function (event: Event) {
    console.log(String(event.target));
  })
  .on("complete", function (event: Event) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentTarget: any = event.currentTarget;
    console.log("Fastest is " + currentTarget.filter("fastest").map("name"));
  })
  // run async
  .run({ async: true });

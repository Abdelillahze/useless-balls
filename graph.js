class Graph {
  constructor() {
    this.adjencyList = {};
  }
  addVertix(vertix) {
    if (this.adjencyList[vertix]) return;

    this.adjencyList[vertix] = new Set();
  }
  addEdge(vertix1, vertix2) {
    if (!this.adjencyList[vertix1]) {
      this.addVertix(vertix1);
    }
    if (!this.adjencyList[vertix2]) {
      this.addVertix(vertix2);
    }
    this.adjencyList[vertix1].add(vertix2);
    this.adjencyList[vertix2].add(vertix1);
  }

  display() {
    for (let vertix in this.adjencyList) {
      console.log(vertix + " -> " + [...this.adjencyList[vertix]]);
    }
  }

  deleteVertix(vertix) {
    if (!this.adjencyList[vertix]) return;

    for (let vertixEdge of this.adjencyList[vertix]) {
      this.deleteEdge(vertix, vertixEdge);
    }
    delete this.adjencyList[vertix];
  }

  deleteEdge(vertix1, vertix2) {
    this.adjencyList[vertix1].delete(vertix2);
    this.adjencyList[vertix2].delete(vertix1);
  }

  hasEdge(vertix1, vertix2) {
    return (
      this.adjencyList[vertix1].has(vertix2) &&
      this.adjencyList[vertix2].has(vertix1)
    );
  }
}

const graph = new Graph();

graph.addVertix("A");
graph.addVertix("B");
graph.addVertix("C");

graph.addEdge("A", "B");
graph.addEdge("B", "C");

graph.display();
console.log(graph.hasEdge("A", "B"));
graph.display();

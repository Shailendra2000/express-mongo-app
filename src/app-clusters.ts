import cluster from "cluster";
import os from "os";

const cpuCores = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Cluster's parent process:${process.pid} started!`);

  for (let i = 0; i < cpuCores; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code) => {
    console.log(
      `Worker process:${worker.process.pid} exited with code: ${code}.`
    );
    cluster.fork();
  });
} else {
  (async () => {
    await import("./app");
  })();
}

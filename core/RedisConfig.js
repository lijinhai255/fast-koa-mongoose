const redis = require("redis");
const config = require("../config/config");
const retryStrategy = require("node-redis-retry-strategy");
// import log4js from '@/config/Log4j'
const { createClient } = redis;
// const logger = log4js.getLogger('out')

const options = {
  host: config.REDIS.host,
  port: config.REDIS.port,
  password: config.REDIS.password,
  // no_ready_check: true,
  detect_buffers: true,
  reconnectStrategy: retryStrategy(),
};

// const client = redis. createClient(options)
let client = createClient(options);
let isInitializing = false; // 标记是否正在初始化连接

const initRedis = async () => {
  if (!client.isOpen) {
    if (!isInitializing) {
      isInitializing = true;
      client.on("error", (err) => {
        console.log("Redis Client Error", err);
      });
      await client.connect().catch(console.error);

      client.on("end", () => {
        console.log("Redis connection has closed");
      });

      client.on("reconnecting", (o) => {
        console.log("Redis client reconnecting", o.attempt, o.delay);
      });

      isInitializing = false;
    } else {
      while (!client.isOpen) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  }
  return client;
};

const setValue = async (key, value, time) => {
  await initRedis();
  if (typeof value === "undefined" || value == null || value === "") {
    return;
  }
  if (typeof value === "string") {
    if (typeof time !== "undefined") {
      client.set(key, value, "EX", time, (err, result) => {
        console.log("client.set -> err", err);
      });
      // client.set(key, value);
      // client.expire(key, time);
    } else {
      client.set(key, value);
    }
  } else if (typeof value === "object") {
    // { key1: value1, key2: value2}
    // Object.keys(value) => [key1, key2]
    Object.keys(value).forEach(async (item) => {
      await client.hSet(key, item, value[item], redis.print);
    });
  }
};

const getValue = async (key) => {
  return await client.get(key);
};

const getHValue = async (key) => {
  try {
    return await client.hGetAll(key);
  } catch (error) {
    console.error("Failed to retrieve hash value:", error);
    return null; // or handle the error as appropriate for your application
  }
};

const delValue = async (key) => {
  client.del(key, (err, res) => {
    if (res === 1) {
      console.log("delete successfully1212");
    } else {
      console.log("delete redis key error:" + err);
    }
  });
};

module.exports = { client, setValue, getValue, getHValue, delValue, initRedis };

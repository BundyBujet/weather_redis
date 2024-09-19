const { Router } = require("express");
const router = Router();
const forcastService = require("../services/forcast.service");
const processCoordinate = require("../utils/number.utils");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the public API!" });
});

router.get("/myloc", async (req, res) => {
  const { q } = req.query;
  const [lat, lon] = q.split(",");

  try {
    const { latitude, longitude } = processCoordinate(lat, lon);

    if (!latitude && !longitude) {
      res.status(403).json({ errors: "Not a valid Latitud and Logtitud" });
    }

    const data = await forcastService.getCurrentForcastByLatAndLong(
      latitude,
      longitude
    );

    res.status(200).json({ temp_c: data });
  } catch (error) {
    res.status(500).json({ errors: "server error" });
  }
});

router.get("/city", async (req, res) => {
  const { q } = req.query;

  try {
    if (!q) {
      res.status(403).json({ errors: "Not a valid city name" });
    }

    const data = await forcastService.getCurrentForcastByCityName(q);

    res.status(200).json({ temp_c: data });
  } catch (error) {
    res.status(500).json({ errors: "server error" });
  }
});

module.exports = router;

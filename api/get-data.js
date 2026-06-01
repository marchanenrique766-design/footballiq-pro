export default async function handler(req, res) {
  const { team } = req.query;
  const apiKey = process.env.SPORTMONKS_API_KEY;

  try {
    const response = await fetch(`https://api.sportmonks.com/v3/football/teams/search/${team}?api_token=${apiKey}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al conectar" });
  }
}

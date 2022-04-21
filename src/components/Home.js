import Typography from "@mui/material/Typography";

export function Home() {
  return (
    <div className="homepage">
      <Typography
        sx={{
          fontFamily: "Yellowtail",
          fontSize: { xs: 40, sm: 65, md: 85, lg: 100 },
        }}
      >
        WELCOME TO MERN CLASS
      </Typography>
    </div>
  );
}

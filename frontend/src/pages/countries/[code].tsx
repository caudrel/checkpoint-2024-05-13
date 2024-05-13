import { useRouter } from "next/router";
import { useCountryQuery } from "../../graphql/generated/schema";
import Header from "@/components/Header";

export default function Country() {
  const router = useRouter();
  const { code } = router.query;
  console.log(code);
  const { data, loading, error } = useCountryQuery({
    variables: { code: typeof code === "string" ? code : "" },
  });

  const country = data?.country;

  console.log(country);

  return (
    <>
      <Header />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {country && (
        <div className="country-show">
          <h1>{country.emoji}</h1>
          <p>
            Name : {country.name} ({country.code})
          </p>
          {country.continent && <p>Continent : {country.continent!.name}</p>}
        </div>
      )}
    </>
  );
}

import { useCountriesQuery } from "@/graphql/generated/schema";
import CountryCard from "@/components/countryCard";
import Header from "@/components/Header";

export default function Home() {
  const { data, loading, error } = useCountriesQuery();

  const countries = data?.countries;

  console.log(countries);

  return (
    <>
      <Header />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="cards-container">
        {countries &&
          countries.map((country) => (
            <div key={country.id}>
              <CountryCard country={country} />
            </div>
          ))}
      </div>
    </>
  );
}

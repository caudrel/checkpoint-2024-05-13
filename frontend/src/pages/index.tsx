import { useCountriesQuery, useAddCountryMutation, CountriesDocument } from "@/graphql/generated/schema";
import CountryCard from "@/components/countryCard";

export default function Home() {
  const { data, refetch, loading, error } = useCountriesQuery();
  const countries = data?.countries;

  const [addCountry] = useAddCountryMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    const res = await addCountry({ variables: { data: { ...formJSON } } });
    window.location.reload();
  };

  console.log(countries);

  return (
    <>
      <div className="add-form-container">
        <form onSubmit={handleSubmit} className="add-form">
          <label>
            Name
            <input type="text" name="name" />
          </label>
          <label>
            Emoji
            <input type="text" name="emoji" />
          </label>
          <label>
            Code
            <input type="text" name="code" />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
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

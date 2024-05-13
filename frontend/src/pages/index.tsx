import { useCountriesQuery, useAddCountryMutation, useContinentsQuery } from "@/graphql/generated/schema";
import CountryCard from "@/components/countryCard";
import { useState } from "react";

export default function Home() {
  // Récupérer la liste des pays
  const { data: countriesData, loading: countriesLoading, error: countriesError } = useCountriesQuery();
  const countries = countriesData?.countries;

  // Mutation pour ajouter un pays
  const [addCountry] = useAddCountryMutation();

  // Récupérer la liste des continents
  const { data: continentsData, loading: continentsLoading, error: continentsError } = useContinentsQuery();
  const continents = continentsData?.continents;

  const [selectedContinent, setSelectedContinent] = useState<string>("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedContinent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    // Convertir l'ID du continent en un objet ObjectId
    const continentId = parseInt(formJSON.continent);
    const continentObject = { id: continentId };

    // Supprimer le champ continent de formJSON et le remplacer par continentObject
    delete formJSON.continent;
    formJSON.continent = continentObject;

    const res = await addCountry({ variables: { data: { ...formJSON } } });
    window.location.reload();
  };

  if (countriesLoading || continentsLoading) return <p>Loading...</p>;
  if (countriesError && continentsError)
    return (
      <p>
        Error: {countriesError.message} - {continentsError.message}
      </p>
    );
  if (countriesError) return <p>Error: {countriesError.message}</p>;
  if (continentsError) return <p>Error: {continentsError.message}</p>;

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
          <label>
            Continent
            <select value={selectedContinent} onChange={handleSelectChange} name="continent">
              <option value="">Select a continent</option>
              {continents?.map((continent) => (
                <option key={continent.id} value={continent.id.toString()}>
                  {continent.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
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

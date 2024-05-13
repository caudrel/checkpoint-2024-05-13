import { Country } from "@/graphql/generated/schema";

export default function CountryCard({ country }: { country: Country }) {
  return (
    <a className="country-card" href={`/countries/${country.code}`}>
      <span>{country.name}</span>
      <span>{country.emoji}</span>
    </a>
  );
}

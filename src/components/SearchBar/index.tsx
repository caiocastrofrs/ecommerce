import { useRouter } from "next/router";
import Button from "../Button";
import MagnifyingGlass from "../icons/MagnifyingGlass";

export function SearchBar() {
  const router = useRouter();

  const clearSearchHandler = () => {
    router.replace("/", undefined, { shallow: false });
  };

  return (
    <form className="m-2 flex flex-col gap-2">
      <label htmlFor="name" className="text-xl font-bold">
        Pesquisar por nome
      </label>
      <label className="relative">
        <MagnifyingGlass classNames="top-1/2 absolute pointer-events-none transform -translate-y-1/2 left-2 text-primary" />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="e.g. celular"
          className="w-full rounded-md border border-neutral-300 bg-neutral-100 p-2.5 pl-12 text-lg"
        />
      </label>
      <div className="flex gap-2">
        <Button type="submit">Buscar</Button>
        <Button
          type="reset"
          theme="secondary"
          classNames="flex-1/3"
          onClick={clearSearchHandler}
        >
          Limpar
        </Button>
      </div>
    </form>
  );
}

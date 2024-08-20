import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCar } from "@/api.ts";
import { UserContext } from "@/context/userContext.tsx";

const Sell = () => {
  const [type, setType] = useState("Sedan");
  const [make, setMake] = useState("Audi");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleCreateCar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || user.id === undefined) {
      alert("You must be logged in to sell a car.");
      return;
    }

    const yearNumber = Number(year);
    const priceNumber = Number(price);

    if (
      isNaN(yearNumber) ||
      isNaN(priceNumber) ||
      yearNumber <= 0 ||
      priceNumber <= 0
    ) {
      alert("Please enter valid numbers for Year and Price.");
      return;
    }

    await createCar({
      type,
      make,
      model,
      year: yearNumber,
      price: priceNumber,
      image,
      ownerId: user.id,
    });

    setType("Sedan");
    setMake("Audi");
    setModel("");
    setYear("");
    setPrice("");
    setImage(null);

    navigate("/home");
  };

  return (
    <section
      id="sell"
      className="gap-16 py-10 md:h-full md:pb-20 mt-20 max-md:bg-gray-200 text-dark-100"
    >
      <h1 className="text-2xl font-bold text-center mb-8">List a Car</h1>
      <div className="py-8 md:w-1/2 max-md:w-3/4 my-8 md:flex justify-center items-center mx-auto bg-white rounded-lg shadow-lg">
        <form onSubmit={handleCreateCar} className="w-full px-8 py-6">
          <div className="mb-6">
            <label
              htmlFor="car-type"
              className="block mb-2 font-bold text-gray-700"
            >
              Car Type
            </label>
            <select
              required
              id="car-type"
              className="block w-full p-3 rounded-lg text-md font-medium text-gray-800 border placeholder-gray-400 border-gray-200 bg-gray-100 focus:border-blue-500 focus:ring-blue-500"
              value={type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setType(e.target.value);
              }}
            >
              {[
                "Sedan",
                "SUV",
                "Coupe",
                "Hatchback",
                "Wagon",
                "Luxury",
                "Truck",
                "Minivan",
                "Convertible",
                "Electric",
                "Crossover",
                "Sports Car",
                "Compact",
                "Full-size",
                "Hybrid",
                "Midsize",
              ].map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="car-make"
              className="block mb-2 font-bold text-gray-700"
            >
              Make
            </label>
            <select
              required
              id="car-make"
              className="block w-full p-3 rounded-lg text-md font-medium text-gray-800 border placeholder-gray-400 border-gray-200 bg-gray-100 focus:border-blue-500 focus:ring-blue-500"
              value={make}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setMake(e.target.value);
              }}
            >
              {[
                "Audi",
                "Alfa Romeo",
                "Acura",
                "Aston Martin",
                "BMW",
                "Bentley",
                "Bugatti",
                "Cadillac",
                "Chrysler",
                "Chevrolet",
                "Citroen",
                "Dodge",
                "Daewoo",
                "Dacia",
                "Ferrari",
                "Ford",
                "Fiat",
                "Great Wall",
                "Honda",
                "Hyundai",
                "Infinity",
                "Isuzu",
                "Jeep",
                "Jaguar",
                "Kia",
                "Lamborghini",
                "Lexus",
                "Lincoln",
                "Land Rover",
                "Maserati",
                "Mazda",
                "Mercedes-Benz",
                "McLaren",
                "Mitsubishi",
                "Mini",
                "Nissan",
                "Nio",
                "Opel",
                "Porsche",
                "Peugeot",
                "Pagani",
                "Rolls-Royce",
                "Renault",
                "Subaru",
                "Saab",
                "Suzuki",
                "Skoda",
                "SEAT",
                "Tesla",
                "Toyota",
                "Volkswagen",
                "Volvo",
              ].map((make, index) => (
                <option key={index} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="car-model"
              className="block mb-2 font-bold text-gray-700"
            >
              Model
            </label>
            <input
              required
              id="car-model"
              className="block w-full p-3 rounded-lg text-md font-medium text-gray-800 border placeholder-gray-400 border-gray-200 bg-gray-100 focus:border-blue-500 focus:ring-blue-500"
              value={model}
              placeholder="Model"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setModel(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="car-year"
              className="block mb-2 font-bold text-gray-700"
            >
              Year
            </label>
            <input
              required
              id="car-year"
              className="block w-full p-3 rounded-lg text-md font-medium text-gray-800 border placeholder-gray-400 border-gray-200 bg-gray-100 focus:border-blue-500 focus:ring-blue-500"
              value={year}
              placeholder="Year"
              pattern="\d{4}"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setYear(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="car-price"
              className="block mb-2 font-bold text-gray-700"
            >
              Price
            </label>
            <input
              required
              id="car-price"
              className="block w-full p-3 rounded-lg text-md font-medium text-gray-800 border placeholder-gray-400 border-gray-200 bg-gray-100 focus:border-blue-500 focus:ring-blue-500"
              value={price}
              placeholder="Price"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="car-image"
              className="block mb-2 font-bold text-gray-700"
            >
              Upload Image
            </label>
            <input
              id="car-image"
              className="block w-full p-3 rounded-lg text-md font-medium text-gray-800 border placeholder-gray-400 border-gray-200 bg-gray-100 focus:border-blue-500 focus:ring-blue-500"
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-dark-100 hover:bg-dark-200 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Sell Car
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Sell;

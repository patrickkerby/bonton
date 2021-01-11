Discount Rules:
  Regular bulk pricing:
    5-10 units = 10% off
    11+ units = 20% off
  Seasonal bulk pricing:
    If pickup date is between [Selected Date 1] & [Selected Date 2]:
      5-10 units = 15% off
      11+ units = 25% off

Get the line items from the cart that belong to categories: 
  10 (Bagels) 
  52 (Bread)
  91 (Sweet Buns)

Exclude items that are in our bulk discount blacklist:
  899 (Pretzels)
  963 (Egg Bread)
  1087 (Olive Flutes)
  1119 (Amandine Croissant)
  1164 (Rugelach)
  1988 (Fig & Pistachio Rugelach)
  1158 (Cranberry, Almond, Marmalade Rugelach)
  1168 (Kouign-Amann)
  1177 (Canelé de Bordeaux)

From this list of line items, establish the "units" for each.
  If line-item package size is:
    Single: Quantity counts as 1/6 of a unit
    Half-Dozen or 6-pack: Quantity counts as 1 unit
    Dozen: Quantity counts as 2 units

Add up all units and establish which discount to apply (10%, 15%, 20%, 25%)

Now that we have the discount, go through each eligible line item in the cart and apply the discount to the price. 
  IF the line item has package size of "single":
    Apply discount to number of items that make up a full "unit" (batches of 6). Charge full price for remainder. 
    Ex: Quantity = 32? 30 items receive discount, 2 items do not.

Add up total discount provided, subtract from full price, and provide notice of savings.

export class BffClient {
  public static async getRiskRecommendation(actionToken: string | null | undefined) {
    if (actionToken) {
      const res = await fetch(`/api/recommendation?actionToken=${actionToken}`);
      const resJson = await res.json();
      return resJson;
    }
    return null;
  }
}
